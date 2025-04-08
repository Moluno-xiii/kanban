const AddMemberForm = ({
  handleModal,
}: {
  handleModal: (state: boolean) => void;
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    handleModal(false);
  };
  const date = new Date();
  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-2">
        <label aria-label="Input email title" htmlFor="email">
          User Email
        </label>
        <input
          aria-label="Member email input box"
          required
          minLength={3}
          placeholder="e.g VladTheImpaler@gmail.com"
          type="email"
          id="email"
          name="email"
        />
      </div>
      <input type="hidden" name="id" value={crypto.randomUUID()} />
      <input type="hidden" name="dateCreated" value={date.toDateString()} />
      <button aria-label="submit button" type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default AddMemberForm;
