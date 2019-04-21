export const CREATE_BOOK_MUTATION = `
    mutation createBook(
        $title: String!
        $subtitle: String!
        $description: String!
        $author: String!
        $publishedDate: String!
        $image: String! 
        $category: String!
        $publisher: String!
    ) {
        createBook(input: {
            title: $title
            subtitle: $subtitle
            description: $description
            author: $author
            publishedDate: $publishedDate
            image: $image
            category: $category
            publisher: $publisher
        }) {
            _id
        }
    }
`