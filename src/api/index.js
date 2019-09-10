export const uploadImage = async image => {
  const formData = new FormData();
  const {uri, fileName, type} = image;
  const imgObj = {uri, name: fileName, type};
  formData.append('image', imgObj);
  try {
    const response = await fetch(
      'https://rn-bootcamp-09-2019.herokuapp.com/api/image/upload',
      {
        method: 'POST',
        Accept: 'application/json',
        ContentType: 'multipart/form-data',
        body: formData,
      },
    );
    const result = await response.json();

    if (result.status === 'success') {
      return result.imageUrl;
    }
    return false;
  } catch (e) {
    return false;
  }
};
