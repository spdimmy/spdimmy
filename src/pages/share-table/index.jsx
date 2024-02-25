const ShareTable = () => {
  // const [editMode, setEditMode] = useState(false);

  return (
    <form>
      <input
        type="text"
        placeholder="Type your name"
        name="userName"
        required
      />
      <button type="submit">+</button>
    </form>
  );
};

export default ShareTable;
