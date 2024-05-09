import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ListItem from "../../component/ListItems";
import { addStudentData, fetchStudents } from "./studentSlice";

export default function Students() {
  const initialFormValue = {
    name: "",
    age: "",
    class: "",
    gender: "",
    attendance: "",
    marks: "",
  };
  const [formData, setFormData] = useState(initialFormValue);
  const { students } = useSelector((state) => state?.students);
  const { status } = useSelector((state) => state?.students);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents());
  }, []);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submited");
    dispatch(addStudentData(formData));
    setFormData(initialFormValue);
  };
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div>
      <h3>Students Page</h3>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="name"
          name="name"
          required
          onChange={onChangeHandler}
          value={formData.name}
        />
        <input
          type="number"
          name="age"
          id="age"
          min={3}
          max={20}
          placeholder="age"
          required
          onChange={onChangeHandler}
          value={formData.age}
        />

        <select
          name="gender"
          id="gender"
          required
          onChange={onChangeHandler}
          value={formData.gender}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Transgender">Transgender</option>
        </select>

        <input
          type="text"
          placeholder="Class"
          name="class"
          id="class"
          required
          onChange={onChangeHandler}
          value={formData.class}
        />
        <input
          type="number"
          placeholder="attendance"
          name="attendance"
          id="attendance"
          min={0}
          max={300}
          required
          onChange={onChangeHandler}
          value={formData.attendance}
        />
        <input
          type="number"
          placeholder="marks"
          name="marks"
          id="marks"
          min={0}
          max={500}
          required
          onChange={onChangeHandler}
          value={formData.marks}
        />
        <button>Submit</button>
      </form>
      {status === "loading" && <div className="loader"></div>}
      <ul>
        <h3>List of Students</h3>
        {students?.map((item) => (
          <ListItem key={item._id} item={item} type={"student"} />
        ))}
      </ul>
    </div>
  );
}