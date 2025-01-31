import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  useGetBlogDetailQuery,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
} from '../../slices/blogsApiSlice';
import { Form, Button } from 'react-bootstrap';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { convert } from 'html-to-text';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
export { BACKEND_URL } from '../../constants';

const BlogEditScreen = () => {
  const { id: blogId } = useParams();
  const navigate = useNavigate();

  const options = {
    wordwrap: 130,
  };

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [imageChanged, setImageChanged] = useState(false);

  const {
    data: blog,
    isLoading,
    error,
    refetch,
  } = useGetBlogDetailQuery(blogId);

  const [updateBlog, { isLoading: loadingUpdate }] = useUpdateBlogMutation();
  const [uploadBlogImage, { isLoading: loadingUpload }] =
    useUploadBlogImageMutation();

  
  const editor = useEditor({
    extensions: [StarterKit, Underline, TextStyle, Color],
    content: blog?.description || '',
  });

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setImage(blog.image);

      if (editor && blog.description) {
        editor.commands.setContent(blog.description);
      }
    }
  }, [blog, editor]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageChanged(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = editor.getHTML();

      const desText = convert(description, options);

      await updateBlog({
        blogId,
        image: imageChanged ? `${BACKEND_URL}${image}` : image,
        title,
        description: desText,
      }).unwrap();

      console.log('testing');

      toast.success('Blog updated');
      refetch();
      navigate('/blogs');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Editor toolbar component
  const Toolbar = () => {
    if (!editor) return null;

    return (
      <div className='toolbar mb-2'>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`me-2 btn btn-${
            editor.isActive('bold') ? 'primary' : 'outline-secondary'
          }`}
        >
          Bold
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`me-2 btn btn-${
            editor.isActive('italic') ? 'primary' : 'outline-secondary'
          }`}
        >
          Italic
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`me-2 btn btn-${
            editor.isActive('underline') ? 'primary' : 'outline-secondary'
          }`}
        >
          Underline
        </button>
        <button
          type='button'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`me-2 btn btn-${
            editor.isActive('heading', { level: 1 })
              ? 'primary'
              : 'outline-secondary'
          }`}
        >
          H1
        </button>
      </div>
    );
  };

  return (
    <>
      <Link to='/blogs' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Blog</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              />
              {loadingUpload && <Loader />}
            </Form.Group>
            <Form.Group controlId='title' className='my-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter blog title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description' className='my-3'>
              <Form.Label>Description</Form.Label>
              <Toolbar />
              <div
                style={{ border: '1px solid #ced4da', borderRadius: '0.25rem' }}
              >
                <EditorContent editor={editor} />
              </div>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BlogEditScreen;
