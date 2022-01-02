const scheduleNavbar = document.querySelector('.schedule-navbar');
const navbarItems = document.querySelectorAll('.days');
console.log("js hooked");
const scheduleBlocks = document.querySelectorAll('.hack-schedule');

scheduleNavbar.addEventListener('click', e => {
    let itemsArr = Array.prototype.slice.call(navbarItems);
    let blocksArr = Array.prototype.slice.call(scheduleBlocks);
    console.log(itemsArr);
    console.log(blocksArr);
    itemsArr.forEach((item, index) => {
        item.classList.remove('active');
        blocksArr[index].classList.remove('active');
    })
    e.target.classList.add('active');
    console.log(e.target.getAttribute('class')[0]);
    blocksArr.forEach((block, index) => {
       let firstNumber = block.getAttribute('class')[0];
       if(firstNumber === e.target.getAttribute('class')[0]){
           block.classList.add('active');
       }
    })

});