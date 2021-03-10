import * as React from 'react'
import * as ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

import "./index.css";

function App() {
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = data => {
    alert(JSON.stringify(data));
  };

  const addFriend = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeFriend = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  const clearFriends = () => {
    setIndexes([]);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <fieldset name='default' key='default'>
        <label>
          First Name default:
              <input
            type="text"
            name="defaultfirst"
            ref={register({ required: true, minLength: 3 })}
          />

          {errors.defaultfirst ? errors.defaultfirst.type === "required" && (
            <p>Your input is required</p>
          ) : ''}
          {errors.defaultfirst ? errors.defaultfirst.type === "minLength" && (
            <p>Your input must be larger then 2 characters</p>
          ) : ''}
        </label>

        <label>
          Last Name default:
              <input
            type="text"
            name='defaultlast'
            ref={register({ required: true })}

          />
          {errors.defaultlast ? errors.defaultlast.type === "required" && (
            <p>Your input is required</p>
          ) : ''}
          {errors.defaultlast ? errors.defaultlast.type === "minLength" && (
            <p>Your input must be larger then 2 characters</p>
          ) : ''}
        </label>
        <button type="button" onClick={addFriend}>
          Add Friend
      </button>

      </fieldset>
      {indexes.map(index => {
        const fieldName = `friends${index}`;
        const fieldName2 = `friends${index + 1}`;
        return (
          <fieldset name={fieldName} key={fieldName}>
            <label>
              First Name {index}:
              <input
                type="text"
                name={fieldName}
                ref={register({ required: true, minLength: 3 })}
              />

              {errors[fieldName] ? errors[fieldName].type === "required" && (
                <p>Your input is required</p>
              ) : ''}
              {errors[fieldName] ? errors[fieldName].type === "minLength" && (
                <p>Your input must be larger then 2 characters</p>
              ) : ''}
            </label>

            <label>
              Last Name {index}:
              <input
                type="text"
                name={`${fieldName2}`}
                ref={register({ required: true })}

              />
              {errors[fieldName2] ? errors[fieldName2].type === "required" && (
                <p>Your input is required</p>
              ) : ''}
              {errors[fieldName2] ? errors[fieldName2].type === "minLength" && (
                <p>Your input must be larger then 2 characters</p>
              ) : ''}
            </label>
            <button type="button" onClick={addFriend}>
              Add Friend
      </button>
            <button type="button" onClick={removeFriend(index)}>
              Remove
            </button>
          </fieldset>
        );
      })}


      <button type="button" onClick={clearFriends}>
        Clear Friends
      </button>
      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("container");
ReactDOM.render(<App />, rootElement);
