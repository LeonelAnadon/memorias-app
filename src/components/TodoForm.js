import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const TodoForm = ({ submitHandler }) => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleReset = () => {
    setTimeout(() => {
      reset()
    }, 0)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="group-input">
        <input
          {...register("title")}
          name="title"
          type="text"
          autoComplete="not"
          maxLength="38"
          spellCheck={false}
          required
        />
        <span></span>
        <label>Título</label>
      </div>
      <div className="group-input">
        <textarea
          {...register("description")}
          name="description"
          type="text"
          rows="6"
          maxLength="125"
          spellCheck={false}
          autoComplete="not"
          required
        />
        <span></span>
        <label>Descripción</label>
        <div className="group-input">
          <button onClick={handleReset}>Guardar</button>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
