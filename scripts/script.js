const inputButton = document.querySelector('#search-button');
const book = document.querySelector('.book');
const bookDetailContent = document.querySelector('.book-details-content');
const detailsCloseBtn = document.querySelector('.book-details-closeBtn');

// event listeners
inputButton.addEventListener('click', getBookList);
book.addEventListener('click', getBookDetails);
detailsCloseBtn.addEventListener('click',()=>{
    bookDetailContent.parentElement.classList.remove('showBook');
})


function getBookList(e){
    e.preventDefault();
    let searchInput = document.getElementById('filter-input').value.trim();
    fetch(`https://www.dbooks.org/api/search/${searchInput}`)
    .then(response => response.json())
    .then(data => {
        let result = data.books;
        let div = "";
       if(result){
           result.forEach(element =>{
            let {
            id,
            title,
            image,
        } = element;
            div +=` 
            <div class="book-item" data-id = ${id}>
                <div class="book-image">
                    <img src="${image}" alt="img" id="book-img">
                </div>
                 <div class="title">
                   <h3>${title}</h3>
               </div>
               <button type="submit" class="book-details-btn">SEE DETAILS</button>
            </div>`;
               book.classList.remove('notFound');     
           });
       }else{
        div += "Sorry, we can't find that book";
        book.classList.add('notFound');
       }
       book.innerHTML = div;
    })
}

function getBookDetails(e){
    e.preventDefault();
    if(e.target.classList.contains('book-details-btn')){
        let bookItem = e.target.parentElement;
        fetch(`https://www.dbooks.org/api/book/${bookItem.dataset.id}`)
        .then(response => response.json())
        .then(data => bookDetailsModal(data));
    }

}

function bookDetailsModal(book){
    let {title,authors,description,subtitle,publisher,image,year,download,}= book;
    let div = `
       <div class="book-title">
                    <span>${title}</span>
                </div>
                <div class="authors">
                   <span id="authors-text">authors:</span> <span> ${authors}</span>
                </div>
                <div class="img">
                    <img src="${image}" alt="" width="300px" height="350px">
                </div>

                <div class="description">
                    <p class="description-paragraph">${description}</p>
                <div class="subtitle">
                    <p>${subtitle}</p>
                </div>
                <div class="publisher">
                    <span>publisher: ${publisher}</span>
                </div>             
                <div class="year">
                    <span>year: ${year}</span>
                </div>
                </div>
                <div class="btn-download">
                    <button>
                        <a href="${download}">DOWNLOAD</a>
                    </button>
                </div>             
    `
    bookDetailContent.innerHTML = div;
    bookDetailContent.parentElement.classList.add('showBook');
}

