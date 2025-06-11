import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextEditor.css';

const TextEditor = ({
  value,
  setValue,
}: {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'color', 'image'],
      [{ 'code-block': true }],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
  ];

  return (
    <div className="custom-editor">
      <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
    </div>
  );
};

export default TextEditor;
