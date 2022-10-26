const baseURL = 'https://strangers-things.herokuapp.com/api/2202-ftb-et-web-pt';

export async function register(username, password) {
    const url = `${baseURL}/users/register`
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        const data = response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function login(username, password) {
    const url = `${baseURL}/users/login`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        const data = response.json();
        // console.log(data, 'inapi')
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function currentUser(token) {
    console.log('TOKEN', token)
    const url = `${baseURL}/users/me`
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getAllPosts() {
    const url = `${baseURL}/posts`
    try {
        const response = await fetch(url)
        const data = response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function getPostById(postId) {
    console.log('api', postId)
    const url = `${baseURL}/posts`
    try {
        const response = await fetch(url)
        const data = await response.json();

        let posts = data.data.posts
        let filtered = posts.filter((x) => {
            if (x._id === postId) return x
        })
        return filtered
    } catch (error) {
        console.log(error)
    }
}

export async function addPost(token, title, description, price, delivery) {
    const url = `${baseURL}/posts`
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    willDeliver: delivery
                }
            })
        })
        const data = response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}


export async function deletePost(token, postId,) {
    const url = `${baseURL}/posts/${postId}`
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = response.json();
        console.log(data)
        return data
    } catch (error) {

    }
}
