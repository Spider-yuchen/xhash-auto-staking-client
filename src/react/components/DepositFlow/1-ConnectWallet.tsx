import React, {Dispatch, FC, ReactElement, SetStateAction, useEffect, useState} from "react";
import {
  Button,
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  withStyles
} from "@material-ui/core";
import QRCode from 'qrcode.react'
import {LanguageEnum, Network} from "../../types";
import SvgIcon from "@material-ui/core/SvgIcon";
import {Language, LanguageFunc} from "../../language/Language";

type LoginWalletProps = {
  walletNetwork: Network | null,
  setWalletNetwork: Dispatch<SetStateAction<Network | null>>,
  network: Network,
  address: string,
  setAddress: Dispatch<SetStateAction<string>>,
  balance: number,
  setBalance: Dispatch<SetStateAction<number>>,
  connected: boolean,
  setConnected: Dispatch<SetStateAction<boolean>>,
  walletErrorMsg: string,
  setWalletErrorMsg: Dispatch<SetStateAction<string>>,
  language: LanguageEnum,
  walletConnectTimer: NodeJS.Timer|null,
  setWalletConnectTimer: Dispatch<SetStateAction<NodeJS.Timer|null>>,
  finishedPolling: Function,
}

const walletConnectIcon = "data:image/png;base64,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"

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    borderColor: '#c4c4c4',
    lineHeight: 1.5,
    color: "#000000",
    backgroundColor: "#ffffff",
    '&:hover': {
      color: "#ffffff",
      backgroundColor: "#000000",
    },
  },
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        margin: theme.spacing(1),
      },
      card: {
        margin: "auto auto",
        width: "240px",
        height: "240px",
        backgroundColor: "white",
      },
      qrCode: {
        margin: "10px",
        padding: "10px 10px 10px 10px",
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    }),
);

const ConnectWallet: FC<LoginWalletProps> = (props): ReactElement => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [ uri, setUri ] = useState("")

  //默认未连接等待连接
  let status = props.connected

  useEffect(()=>{
    if (status && !props.walletConnectTimer){
      Polling()
    }
  })

  const getWalletMessage = () => {
    let netWork: Network | null = null
    const wallet = window.walletApi.getWalletStatus()
    if (wallet.connected && wallet.assets.length !== 0 && !status){
      props.setConnected(wallet.connected)
      props.setAddress(wallet.address)
      netWork = wallet.chainId === 5 ? Network.GOERLI : wallet.chainId === 1 ? Network.MAINNET : null;
      props.setWalletNetwork(netWork)
      if (props.walletConnectTimer){
        status = true
      }
      props.setBalance(wallet.balance/Math.pow(10,9))
      if (props.network !== netWork){
        props.setWalletErrorMsg(LanguageFunc("Wrong_Network", props.language) + props.network)
      }else{
        props.setWalletErrorMsg("")
      }
    }else if(!wallet.connected && status){
      status = false
      setUri("")
      props.finishedPolling()
      props.setWalletErrorMsg(LanguageFunc("Wallet_DisConnect", props.language));
    }
  }

  const Polling = () => {
    props.setWalletConnectTimer(setInterval(getWalletMessage, 750))
  }

  const connect = async () => {
    props.finishedPolling()
    const connectUri = await window.walletApi.connect()
    setUri(connectUri);

    Polling()
  }

  const killSession = async () => {
    window.walletApi.killSession()
    props.finishedPolling()
    setUri("")
    props.setConnected(false)
  }

  return (
   <Grid container spacing={3}>
     <Grid item xs={12}>
       {props.connected ?
           <Button variant="contained" onClick={killSession}>
             <Language language={props.language} id="DisConnect"/>
           </Button> :
           <ColorButton variant="contained" className={classes.button} startIcon=
           {
             <SvgIcon>
                <image width="25" height="25" xlinkHref={walletConnectIcon}/>
             </SvgIcon>
           }
                        onClick={connect}>
             {"WalletConnect"}
           </ColorButton>
       }
     </Grid>
     <Grid item xs={12}>
         { props.connected ? props.walletErrorMsg ?
             (props.walletErrorMsg)
             :
           (<Grid
             container
             direction="column"
             justifyContent="space-between"
             alignItems="stretch"
          >
           <Grid
               container
               direction="row"
               justifyContent="space-between"
               alignItems="flex-start"
           >
             <Grid item xs={4}>
               <Language language={props.language} id="Address"/>
             </Grid>
             <Grid item xs={8}>
               {props.address}
             </Grid>
           </Grid>
           <Grid
               container
               direction="row"
               justifyContent="space-between"
               alignItems="flex-start"
           >
             <Grid item xs={4}>
               <Language language={props.language} id="Network"/>
             </Grid>
             <Grid item xs={8}>
               {props.network}
             </Grid>
           </Grid>
           <Grid
               container
               direction="row"
               justifyContent="space-between"
               alignItems="flex-start"
           >
             <Grid item xs={4}>
               <Language language={props.language} id="Balance"/>
             </Grid>
             <Grid item xs={8}>
               {props.balance}
             </Grid>
           </Grid>
         </Grid>) : uri
             &&
             (
                 <Card className={classes.card}>
                     <QRCode className={classes.qrCode}
                               value={uri} // 需要生成二维码图片的url地址
                               size={220} // 二维码图片大小
                               fgColor="#000000" // 二维码图片背景色
                               bgColor="#FFFFFF"
                               level="M"/>
                 </Card>
             )
         }
     </Grid>
   </Grid>
  );
}

export default ConnectWallet;
