const submitBtn = document.querySelector(".btn");
let tableContent = document.querySelector("table");
let data = localStorage.getItem("passwords");

if(data == null){
    tableContent.innerHTML = null;
}else{

        let arr  =JSON.parse(data);

        for(let indx =0;indx <arr.length;indx++){
            const element = arr[indx];
            let content ="";
            content = `<tr>
                        <td>${element.website}</td>
                        <td>${element.username}</td>
                        <td>${element.password}</td>
                        <td>${"Delete"}</td>
                        </tr>`;
        }

        tableContent.innerHTML = tableContent.innerHTML + content

   
}

submitBtn.addEventListener("click", (e) =>{
    e.preventDefault(); //helps not submitting the form,

    let passwords = localStorage.getItem("passwords");
    if(passwords == null){
        let json = [];
        json.push({username:username.value,password:password.value});
        alert("Password Saved Successfully!");
        localStorage.setItem("passwords",JSON.stringify(json));
    }else{
        let json = JSON.parse(localStorage.getItem("passwords"));
        json.push({username:username.value,password:password.value});
        alert("Password Saved Successfully!");
        localStorage.setItem("passwords",JSON.stringify(json));
    }
});

