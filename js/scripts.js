/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})
window.addEventListener("hashchange", () => {
    let url = location.hash.substr(2);
    if(url == '') {
        loadData()
    }else {
        fetch(prefixUrl +url).then(r => r.json()).then(result => {
            postsBox.innerHTML = `
            <article class="mb-4">
                <div class="container px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                    ${result.data.attributes.content}
                    </div>
                </div>
            </article>`
        } )
    }
})
let posts=[];
const prefixUrl = "http://localhost:1337/api/"
const requestPostUrl=`${prefixUrl}posts`
const requestUserPostsUrl=`${requestPostUrl}?populate=*`
const body = document.querySelector('body')
const postsBox = document.querySelector(".posts")
const postTitle =document.querySelector('#post-title')
const postSlug =document.querySelector('#post-slug')
window.addEventListener("hashchange", () => {
    let url = location.hash.substr(2);
    if(url == '') {
        loadData()
    }else {
        fetch(prefixUrl +url)
        .then(r => r.json())
        .then(result => {
            postsBox.innerHTML = `
            <article class="mb-4">
                <div class="container px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                    ${result.data.attributes.content}
                    </div>
                </div>
            </article>`
            postTitle.textContent=result.data.attributes.title
            postTitle.textContent=result.data.attributes.slug
        } )
    }
})
async function loadData(){
    posts= await fetch(requestUserPostsUrl).then(x=>x.json())
    renderPosts();
}
function renderPosts(){
    for (const post of posts.data) {
        // const author=users.find(x=>x.id===post.id)
        postsBox.innerHTML +=
            `<div class="post-preview" data-id="${post.id}">
                <a href="#/posts/${post.id}">
                    <h2 class="post-title">${post.attributes.title}</h2>
                    <h4 class="post-subtitle">${post.attributes.summary}</h4>
                </a>
                <p class="post-meta">
                    <span>${post.attributes.user.data.attributes.username}</span> ||
                    <span>${post.attributes.updatedAt.substr(0,10)}</span>
                </p>
            </div>
            <hr class="my-4" />
        `
    }
}
loadData();