const postButton = document.getElementById('postButton');
const commentsButton = document.getElementById('commentsButton');
commentsButton.style.display = 'none';

postButton.addEventListener('click', fetchPost)
commentsButton.addEventListener('click', fetchComments)

function fetchPost() {
    const id = document.getElementById('postId').value;

    if (id < 1 || id > 100) {
        alert('Enter valid ID between 1 and 100');
        return;
    }
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            document.getElementById('postDetails').innerHTML = `<h1>${data.title}</h1><p>${data.body}</p>`;
            commentsButton.style.display = 'block';
        })
        .catch(error => {
            console.error(error);
        });
}

function fetchComments() {
    const id = document.getElementById('postId').value;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            let comments = '';
            data.forEach(comment => {
                comments += `<h2>${comment.name}</h2><p>${comment.body}</p>`;
            });
            document.getElementById('commentsDetails').innerHTML = comments;
        })
        .catch(error => {
        console.error(error);
    });
}

