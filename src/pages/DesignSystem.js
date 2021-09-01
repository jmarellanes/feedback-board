import Button from '../components/Button';

export default function DesignSystem() {
  return (
    <div>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At, corrupti
        deserunt.
      </h1>
      <h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo
        cupiditate corrupti voluptas, iusto.
      </h2>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At, corrupti
        deserunt.
      </h3>
      <h4>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo
        cupiditate corrupti voluptas, iusto.
      </h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        facere sed eius, deserunt, nesciunt unde harum distinctio illum
        consequuntur id maiores accusamus nam magnam tempora numquam voluptas
        soluta mollitia praesentium! Nesciunt, enim repudiandae modi placeat
        iste ab, odit cupiditate voluptate officiis laborum architecto
        voluptatem quasi cum assumenda error expedita. Eveniet doloribus numquam
        necessitatibus exercitationem maxime culpa architecto repellendus amet
        aspernatur.
      </p>
      <Button buttonStyle='button--primary'>Button Primary</Button>
      <Button buttonStyle='button--secondary'>Button Secondary</Button>
      <Button buttonStyle='button--tertiary'>Button Tertiary</Button>
      <Button buttonStyle='button--danger'>Button Danger</Button>
      <Button buttonStyle='button--back-light' svgIcon={true}>
        Go Back
      </Button>
      <Button buttonStyle='button--back-dark' svgIcon={true}>
        Go Back
      </Button>
    </div>
  );
}
