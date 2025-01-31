import { Helmet } from 'react-helmet-async';

const Meta = ({
  title = 'Welcome To ByteHub',
  description = 'All in one place to find desktop related items you have been dreaming.',
  keywords = 'desktop related items, fair price desktop items',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

export default Meta;
