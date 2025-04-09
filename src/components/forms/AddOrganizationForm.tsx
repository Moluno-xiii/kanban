const AddOrganizationForm = ({ handleModal }: { handleModal: () => void }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    handleModal();
  };
  const date = new Date();
  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-2">
        <label aria-label="Organization title label title" htmlFor="title">
          Organization title
        </label>
        <input
          aria-label="organization title input box"
          required
          minLength={3}
          placeholder="e.g Facebook Incorporated"
          type="text"
          id="title"
          name="title"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label
          aria-label="Organization description label title"
          htmlFor="description"
        >
          Organization description
        </label>
        <textarea
          aria-label="organization description input box"
          required
          minLength={3}
          placeholder="e.g organization for facebook employees "
          id="description"
          name="description"
        />
      </div>
      <input type="hidden" name="id" value={crypto.randomUUID()} />
      <input type="hidden" name="dateCreated" value={date.toLocaleString()} />
      <button aria-label="submit button" type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default AddOrganizationForm;
