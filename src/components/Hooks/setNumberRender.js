export const setFirstRender =(width)=>{

  if(width >= 1230){
    return 12;
  }else if(width < 1229 && width >= 930){
    return 9;
  }else if(width < 929 && width >= 580){
    return 8;
  }else{
    return 5;
  }
}

export const setNextRender = (width)=>{

  if(width >= 1230){
    return 4;
  }else if(width < 1229 && width >= 930){
    return 3;
  }else if(width < 929 && width >= 580){
    return 2;
  }else{
    return 2;
  }

}
