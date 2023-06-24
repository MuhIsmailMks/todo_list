const taskLeft = document.querySelector('.task-left');
const taskCompleted = document.querySelector('.task-completed');
const listsContainer = document.querySelector('.lists_container'); 

// total lists
let countChildLeft = 0;
function totalLists(countChildComplete){
   let listsContainerChild = listsContainer.children; 
    
   countChildLeft = listsContainerChild.length;  
    countChildComplete = 0; 

  for(let i = 0; i < listsContainerChild.length; i++){  
    if(listsContainerChild[i].classList.contains('done')){ 
        countChildLeft -= 1;
    } 
    if(listsContainerChild[i].classList.value === ('list d-flex done')){ 
        countChildComplete += 1;
    }

  }  

   taskLeft.innerHTML = `${countChildLeft.toString()} Task Lefts`; 
   taskCompleted.innerHTML = `${countChildComplete.toString()} Task Completed`; 
}
totalLists();


// add list
const inputList = document.querySelector('.add_list input');
const addListBtn = document.querySelector('.add_list .add_btn');
const addListBtnImg = document.querySelector('.add_list .add_btn img');

function addList(inputValue){
    inputValue = inputList.value;  
    if(inputList.value.replace(/\s/g, '').length === 0){
        alert('please write down your list')
    } else {
        let newList = document.createElement('div');
        newList.setAttribute('class', "list d-flex")
        newList.innerHTML = ` 
            <div class="setting d-flex-center">

                <img src="img/settings.png" alt="" class="setting_list">

                <div class="setting_container d-flex">

                    <div class="delete d-flex-center">
                        <div class="image d-flex-center"> 
                            <img src="img/deleteIcon.png" alt=""  >
                        </div>
                        <p class="d-flex-center">Delete</p>
                        <div class="btn_set" id="delete"></div>
                    </div>

                    <div class="line "></div>

                    <div class="edit">
                        <div class="image d-flex-center"> 
                        <img src="img/editIcon.png" alt="">
                        </div>
                        <p class="d-flex-center">Edit</p>
                        <div class="btn_set" id="edit"></div>
                    </div>
                
                 </div> 

            </div> 
            
             <p class="text_list">${inputValue}</p>
            <div class="tick d-flex-center"></div> 

            <div class="edit_list_containers d-flex">
                <input type="text" maxlength="30">
                <img src="img/doneEdit.png" alt="doneEdit" class="done_edit" id="done_edit">
           </div>
        `  
        let referenceChild = listsContainer.firstChild;  
        listsContainer.insertBefore(newList, referenceChild);
    } 

    inputList.value = '';
    totalLists() 
}

addListBtn.addEventListener('click', addList) 
inputList.addEventListener('keyup', function(event) { 
    if (event.keyCode === 13) { 
        addList();
    }
});

 
//  list event   

// event list 
listsContainer.addEventListener('click',(e) => {  
  
    let targ = e.target;    
    let settingList = targ.closest('.list'); 
    
    if (!settingList) {
        return;
    }

    let editListContainer = settingList.children[3];
    const inputEdit = editListContainer.querySelector('input');  

    // setting active
    if(targ.className == "setting_list"){
        let settingContainer = targ.closest('div');

        settingContainer.classList.toggle('active');

    }
 
    // edit list
    if(targ.id == "edit"){     
        let setting = settingList.children[0];
        let textList = settingList.children[1];
        
        setting.classList.remove('active'); 
 
        inputEdit.value = textList.innerHTML;

        editListContainer.classList.add('active') 
     }

     // done edit list
     function doneEditList(){ 
     if(settingList.className === 'list d-flex'){  
            let textList = settingList.children[1];  
            if(inputEdit.value.replace(/\s/g, '').length === 0){
                return null;
             } else { 
                textList.innerHTML = inputEdit.value ; 
                editListContainer.classList.remove('active');  
             } 
        } 
    } 
     
     if(targ.id == "done_edit"){ 
      doneEditList()
     }

     inputEdit.addEventListener('keyup', function(event) { 
        if (event.keyCode === 13) {  
            doneEditList()
        }
    });

    // done list || list tick
    if(targ.className == "tick d-flex-center"){
        let parenttick = targ.parentElement;
        targ.classList.add('active');
        parenttick.classList.add('done');
        totalLists();
    }

    // delete list
     if(targ.id == "delete"){ 
        settingList.remove() 
        totalLists();
    }

    //  remove setting
    if(targ.className == "list d-flex"){
        let closeSett = targ.children[0];
        closeSett.classList.remove('active'); 
    } 
 
})



