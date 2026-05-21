export const validateName = (name) => {
    if(!name){
        return {
            success:false,
            message:"Name is required"
        };
    }
    if(typeof name !== 'string'){
        return {
            success:false,
            message:"Name must be string"
        }
    }
    name = name.trim(); // remove leading and trailing white spaces.
    if(name.length < 3 || name.length > 30){
        return {
            success:false,
            message:"Name must have atleast 3 and atmost 30 characters."
        }
    }
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        return {
            success:false,
            message:'Name can only contain letters and spaces.'
        }
    }
    return {
        success:true,
        name
    }
}

export const validateUsername = (username)=>{

    // USERNAME VALIDATION:
    if(!username){
        return {
            success:false,
            message:"Username is required"
        }
    }
    if(typeof username !== 'string'){
        return {
            success:false,
            message:"Username must be a string"
        }
    }
    username = username.trim().toLowerCase();
    if(username.length < 3 || username.length > 20){
        return {
            success:false,
            message:"Username must be between 3 and 20 characters."
        }
    }
    const usernameRegex = /^(?!\d)[a-z0-9_]+$/;;
    if (!usernameRegex.test(username)) {
        return {
            success:false,
            message:'Username can only contain lowercase letters, numbers, and underscores. Also it cannot start with a digit.'
        }
    }
    return {
        success:true,
        username
    }
}

export const validateEmail = (email)=>{

    // EMAIL VALIDATION:
    if (!email) {
        return {
            success:false,
            message:'Email is required.'
        }
    }
    if(typeof email !== 'string'){
        return {
            success:false,
            message:"Email must be a string"
        }
    }
    email = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return {
            success:false,
            message:'Invalid email format.'
        }
    }
    return {
        success:true,
        email
    }
}

export const validatePassword = (password)=>{

    // PASSWORD VALIDATION:
    if (!password) {
        return {
            success:false,
            message:'Password is required.'
        }
    }
    if(typeof password !== 'string'){
        return {
            success:false,
            message:"Password must be a string"
        }
    }
    if (password.length < 8 || password.length > 128) {
        return {
            success:false,
            message:'Password must be between 8 and 128 characters long (both inclusive).'
        }
    }
    if (!/[A-Z]/.test(password)) {
        return {
            success:false,
            message:'Password must contain at least one uppercase letter.'
        }
    }
    if (!/[a-z]/.test(password)) {
        return {
            success:false,
            message:'Password must contain at least one lowercase letter.'
        }
    }
    if (!/[0-9]/.test(password)) {
        return {
            success:false,
            message:'Password must contain at least one number.'
        }
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
        return {
            success:false,
            message:'Password must contain at least one special character.'
        }
    }
    return {
        success:true,
        password
    }
}
    