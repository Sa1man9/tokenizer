import express, { response } from 'express'
import {findType, personalEncodings} from './constant.js';
const router=express.Router()

router.post("/encode",async (req,res)=>{
    try {
        let encoded=[];
        const {str}=req.body;
        if (!str || typeof str !== "string") {
        return res.status(400).json({ message: "Invalid input string" });
        }
        const words=str.split(" ");
        for(let i =0;i<words.length;i++){
            for( let j=0;j<words[i].length;j++){
                const type=findType(words[i][j]);
                encoded.push(`${type}${personalEncodings[words[i][j]]}`)

            }
            if(i!=words.length-1){
            encoded.push(`${findType(" ")}${personalEncodings[" "]}`);
            }
        }
        return res.status(200).json({
            data:encoded,
            message:"encoded successfully"
        })
    } catch (error) {
        console.error("error occurred: ",error)
        return res.status(500).json({
            message:"something went wrong while encoding"
        })
    }
});

router.post("/decode", async (req, res) => {
  try {
    const { token } = req.body;

    if (!Array.isArray(token)) {
      return res.status(400).json({ message: "Invalid tokens array" });
    }

    const decodeMap = Object.fromEntries(
      Object.entries(personalEncodings).map(([char, code]) => [code, char])
    );

    let str = "";
    for (let i = 0; i < token.length; i++) {
      const currentToken = parseInt(String(token[i]).slice(1), 10); 
      str += decodeMap[currentToken] ?? "";
    }

    return res.status(200).json({
      data: str,
      message: "decoded successfully"
    });
  } catch (error) {
    console.error("error occurred: ", error);
    return res.status(500).json({
      message: "something went wrong while decoding"
    });
  }
});

export default router;