export const GET_BOOKS_QUERY = `{
    getBooks {
        _id
        category
        title
        subtitle
        author
        image
    }
}`

export const GET_SINGLE_BOOK_QUERY = `
    query getBook($id: String!) {
        getBook(id: $id) {
            _id
            category
            title
            subtitle
            author
            image
            description
            publisher
            publishedDate
        }
    }
`

export const LOGIN_REQUEST = `
    query login($username: String , $password: String) {
        login(input : {
            username: $username
            password: $password
        })
    }
`