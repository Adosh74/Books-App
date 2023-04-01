import randomstring from 'randomstring';

const randomCode = () => {
  return randomstring.generate({
    length: 5,
    charset: 'alphabetic',
    capitalization: 'uppercase',
  });
};

// console.log(randomCode());

export default randomCode;
