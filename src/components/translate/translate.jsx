import {useState} from "react";
import styles from './translate.module.scss';

const Translate = () => {
  const baseUrl = 'https://translation.googleapis.com/language/translate/v2';
  const apiKey = 'AIzaSyAaQtO72WiWaxEtGxH8hlHxjW8YBEjSu00';

  const [translate, setTranslate] = useState({
    origin: '',
    translated: '',
  });

  const [direction, setDirection] = useState({
    from: 'en',
    to: 'ru',
  });

  const fetchData = async (query) => {
    const url = `${baseUrl}?q=${query}&source=${direction.from}&target=${direction.to}&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    return await response.json();
  };

  const handleInput =  (e) => {
    const value  = e.target.value;

    fetchData(value).then(result => {
      setTranslate({
        origin: value,
        translated: result.data.translations[0].translatedText,
      });
    }).catch(error => {
      console.log(error.message);
    });
  };

  const toggleLanguage = (e) => {
    e.preventDefault();

    setDirection({
      from: direction.to,
      to: direction.from
    });

    fetchData(translate.translated).then(result => {
      setTranslate({
        origin: translate.translated,
        translated: result.data.translations[0].translatedText
      })
    }).catch(error => {
      console.log(error.message);
    });
  };

  return (
    <form className={styles.translate}>
      <fieldset className={styles.translate_item}>
        <label>{direction.from}</label>
        <textarea onChange={handleInput} value={translate.origin} rows={4} />
      </fieldset>
      <fieldset>
        <button onClick={toggleLanguage}>toggle</button>
      </fieldset>
      <fieldset className={styles.translate_item}>
        <label>{direction.to}</label>
        <textarea value={translate.translated} rows={4} readOnly />
      </fieldset>
    </form>
  )
};

export default Translate