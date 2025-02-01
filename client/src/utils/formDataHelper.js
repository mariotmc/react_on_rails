export function objectToFormData(obj, namespace = null, formData = new FormData()) {
  for (let propertyName in obj) {
    if (isValidProperty(obj, propertyName)) {
      const formKey = getFormKey(namespace, propertyName);
      const propertyValue = obj[propertyName];

      appendToFormData(formData, formKey, propertyValue);
    }
  }
  return formData;
}

function isValidProperty(obj, propertyName) {
  return (
    Object.prototype.hasOwnProperty.call(obj, propertyName) &&
    obj[propertyName] !== undefined &&
    obj[propertyName] !== null
  );
}

function getFormKey(namespace, propertyName) {
  return namespace ? `${namespace}[${propertyName}]` : propertyName;
}

function appendToFormData(formData, formKey, propertyValue) {
  if (propertyValue instanceof Date) {
    appendAsDate(formData, formKey, propertyValue);
  } else if (isObjectButNotFile(propertyValue)) {
    objectToFormData(propertyValue, formKey, formData);
  } else {
    formData.append(formKey, propertyValue);
  }
}

function appendAsDate(formData, formKey, date) {
  formData.append(formKey, date.toISOString());
}

function isObjectButNotFile(value) {
  return typeof value === "object" && !(value instanceof File);
}
