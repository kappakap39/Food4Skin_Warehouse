function Validation(values){
    alert("")
    let error = {}

    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(values.email === ""){
        error.email = "กรุณากรอกเมล"
    }
    else if (!email_pattern.test(values.email)){
        error.email = "กรุณากรอกเมลให้ถูกต้อง"
    }
    else{
        error.email = ""
    }
    
    if(values.password === ""){
        error.password = "กรุณากรอกรหัสผ่าน"
    }
    else if (!password_pattern.test(values.password)){
        error.password = "รหัสผ่านไม่ถูกต้อง"
    }
    else{
        error.password = ""
    }

    return error;
}

export default Validation;