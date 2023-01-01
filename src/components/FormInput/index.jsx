import React from "react";
import { Controller, useController } from "react-hook-form";
import stylesScss from "./formInput.module.scss";

function FormInput({
  name,
  control,
  styleInput,
  styleDiv,
  placeholder,
  inputProps,
  onKeyPress,
  label,
  IconLeft,
  onChangeCustom,
  classDivInput,
  errProps,
  containerProps,
}) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className={stylesScss["div-input"]} style={styleDiv}>
      {label.length > 0 && <label style={{ display: "block" }}>{label}</label>}
      <div className={classDivInput}>
        {IconLeft && <div>{IconLeft}</div>}
        <input
          className={stylesScss["input-form"]}
          style={styleInput}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          {...inputProps}
        />
      </div>
      {error?.message && (
        <p
          style={{
            marginTop: "0.2rem",
            color: "red",
            fontSize: 12,
            marginBottom: 0,
          }}
        >
          {error?.message}
        </p>
      )}
    </div>
  );
}

export default FormInput;
