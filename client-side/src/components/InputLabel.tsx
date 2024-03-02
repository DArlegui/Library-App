interface Props {
  inputTitle: string;
  defaultValue?: string;
  changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Label: React.FC<Props> = ({ inputTitle, defaultValue, changeValue }) => {
  return (
    <div className="my-4 flex items-center">
      <label htmlFor="new-book-img_url-input" className="mr-2">
        {`${inputTitle}`}:{' '}
      </label>
      <input
        type="text"
        id="new-book-img_url-input"
        className="border border-gray-300 rounded-md p-2"
        onChange={(e) => changeValue(e)}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Label;
