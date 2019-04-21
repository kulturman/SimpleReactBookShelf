import React , { useState } from "react";
import Spinner from '../../components/Spinner/Spinner';
import { useFormTextField } from '../../hooks/useFormTextField';
import { getClientInstance } from '../../utils/utils';
import { CREATE_BOOK_MUTATION } from '../../graphql/mutations';

const newBook = props => {

    const title = useFormTextField('');
    const subtitle = useFormTextField('');
    const description = useFormTextField('');
    const author = useFormTextField('');
    const publishedDate = useFormTextField('');
    const image = useFormTextField('');
    const category = useFormTextField('');
    const publisher = useFormTextField('');
    const [ errors , setErrors ] = useState({});
    const [ loading , setLoading ] = useState(false);

    const onSubmitHandler = async () => {
        const client = getClientInstance();
        setLoading(true);
        const data = {
            title: title.value , subtitle: subtitle.value , description: description.value,
            author: author.value , publishedDate: publishedDate.value ,
            image: image.value , category: category.value , publisher: publisher.value
        };
        
        try {
            await client.request(CREATE_BOOK_MUTATION , data);
            setLoading(false);
            setErrors({});
            props.history.push('/');
        }

        catch({ response }) {
            if(response.errors) {
                const { data } = response.errors[0];
                setErrors(data);
            }
            setLoading(false);
        }
    };
    
    let content = <Spinner />;

    if(!loading) {
        content = (
            <React.Fragment>
                <div className="page-header">
                    <h4>Add a book</h4>
                </div>
                <form onSubmit={onSubmitHandler}>
                    <div className="row m-3">
                        <div className="col-md-6">
                            <div
                                className={errors.title ? "form-group has-error" : 'form-group'}
                            >
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Title"
                                    {...title}
                                />
                            </div>
                            <div className={errors.subtitle ? "form-group has-error" : 'form-group'}>
                                <input
                                    type="text"
                                    name="subtitle"
                                    className="form-control"
                                    {...subtitle}
                                    placeholder="Subtitle"
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className={errors.image ? "form-group has-error" : 'form-group'}>
                                <input
                                    type="text"
                                    name="image"
                                    className="form-control"
                                    placeholder="Image (URL)"
                                    {...image}
                                />
                            </div>
                            <div className={errors.author ? "form-group has-error" : 'form-group'}>
                                <input
                                    type="text"
                                    name="author"
                                    className="form-control"
                                    {...author}
                                    placeholder="Author(s)"
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className={errors.publishedDate ? "form-group has-error" : 'form-group'}>
                                <input
                                    type="text"
                                    name="publishedDate"
                                    className="form-control"
                                    placeholder="Published data"
                                    {...publishedDate}
                                />
                            </div>
                            <div className={errors.publisher ? "form-group has-error" : 'form-group'}>
                                <input
                                    type="text"
                                    name="publisher"
                                    className="form-control"
                                    {...publisher}
                                    placeholder="Publisher"
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div  className={errors.category ? "form-group has-error" : 'form-group'}>
                                <input
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    placeholder="Category"
                                    {...category}
                                />
                            </div>
                            <div className={errors.description ? "form-group has-error" : 'form-group'}>
                                <input
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    {...description}
                                    placeholder="Description"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-md-offset-3">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </React.Fragment>
        )
    }

    return (
        <div className="container">
            {content}
        </div>
    );
}

export default newBook;
