import { useEffect, useState } from 'react';

function Fade({ loading, children }) {
  const [shouldRender, setRender] = useState(loading);

  useEffect(() => {
    if (loading) setRender(true);
  }, [loading]);

  const onAnimationEnd = () => {
    if (!loading) setRender(false);
  };

  return (
    shouldRender && (
      <div
        style={{ animation: `${loading ? 'fadeIn' : 'fadeOut'} .30s` }}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    )
  );
}

export default Fade;
