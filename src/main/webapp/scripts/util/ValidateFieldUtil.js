function ValidateFieldUtil(){

}

ValidateFieldUtil.isEmpty=function(value){
    try{
        if(typeof(value)=="number") return false;
        if(value==null)  return true;
        if(typeof (value)=="undefined")  return true;
        //if(Object.keys(value).length==0) return true;
        if(value=="")  return true;
        if(value.length==0) return true;
        if(value.length>=0){
            if(String(value).trim().length==0)  return true;
        }
    }catch(er){
        console.log(er)
    }
    return false;
}

ValidateFieldUtil.englishAndNumberOnly=function(element){
    element.keypress(function(event){
        var ew = event.which;
        if(ew == 8)
            return true;
        if(ew == 32)
            return false;
        if(48 <= ew && ew <= 57)
            return true;
        if(65 <= ew && ew <= 90)
            return true;
        if(97 <= ew && ew <= 122)
            return true;
        return false;
    });
}