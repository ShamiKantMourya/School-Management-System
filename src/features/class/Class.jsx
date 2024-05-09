import { useSelector } from "react-redux";
import { useState } from "react";

import ListItem from "../../component/ListItems";

export default function Class() {
  const { students } = useSelector((state) => state?.students);
  const { status } = useSelector((state) => state?.students);
  const [filter, setFilter] = useState({
    class: "",
    gender: "",
    category: "",
  });
  const classCategorised = filter.class
    ? students?.filter((item) => item.class === filter.class)
    : students;

  const genderData = filter.gender
    ? classCategorised.filter((item) => item.gender === filter.gender)
    : classCategorised;
  const sortedData = filter.category
    ? [
      ...[...genderData].sort(
        (a, b) => { return filter.category === "name" ? a.name.localeCompare(b.name) : a[filter.category] - b[filter.category] }
      ),
    ]
    : genderData;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "grade") setFilter({ ...filter, [name]: Number(value) })
    else setFilter({ ...filter, [name]: value });
  };

  return (
    <>
      <h1>Class View</h1>

      <select name="class" id="class" onChange={onChangeHandler}>
        <option value="">Select Class</option>
        <option value="Std I">Std I</option>
        <option value="Std II">Std II</option>
        <option value="Std III">Std III</option>
        <option value="Std IV">Std IV</option>
        <option value="Std V">Std V</option>
        <option value="Std VI">Std VI</option>
        <option value="Std VII">Std VII</option>
        <option value="Std VIII">Std VIII</option>
        <option value="Std IX">Std IX</option>
        <option value="Std X">Std X</option>
        <option value="Std XI">Std XI</option>
        <option value="Std XII">Std XII</option>
      </select>
      <select name="gender" id="gender" onChange={onChangeHandler}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
      </select>

      <select name="category" id="" onChange={onChangeHandler}>
        <option value="">Sort by category</option>
        <option value="name">name</option>
        <option value="age">age</option>
        <option value="marks">marks</option>
        <option value="attendance">attendance</option>
      </select>

      <div>
        {status === "loading" && <div className="loader"></div>}
        <ul>
          <h4>List of Students</h4>
          {sortedData.length>=1 && sortedData?.map((item) => (
            <ListItem key={item._id} item={item} type={"student"} inClassView={true} />
          ))}
         <li>
         {
            sortedData.length === 0 && <div>No students found with these filters</div>
          }
         </li>
        </ul>
      </div>
    </>
  );
}