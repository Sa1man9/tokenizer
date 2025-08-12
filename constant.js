const personalEncodings = {};
const encodeType={
    lowerCaseChar:1,
    upperCaseChar:2,
    space:3,
    specialChars:4
}

let code = 1;

for (let i = 97; i <= 122; i++) {
  personalEncodings[String.fromCharCode(i)] = code++;
}

for (let i = 65; i <= 90; i++) {
  personalEncodings[String.fromCharCode(i)] = code++;
}

personalEncodings[" "] = code++;

const specialChars = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
for (let char of specialChars) {
  personalEncodings[char] = code++;
}

const findType=(word)=>{
    if(word>='a' && word<='z'){
        return 1;
    }else if(word>='A' && word<='Z'){
        return 2;
    }else if(word==" "){
        return 3;
    }
    return 4;
}

export {personalEncodings,findType}