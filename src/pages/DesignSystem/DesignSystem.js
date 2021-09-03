import Button from '../../components/Button';
import Upvotes from '../../components/Upvotes';
import './design-system.scss';

export default function DesignSystem() {
  return (
    <div className='ds'>
      <section className='ds-colors ds__section'>
        <dl className='ds-colors__container'>
          <dt className='ds-colors__title ds__section--title'>
            <h2>Colors</h2>
          </dt>
        </dl>
      </section>

      <section className='ds-typography ds__section'>
        <dl className='ds-typography__container'>
          <dt className='ds-typography__title ds__section--title'>
            <h2>Typography</h2>
          </dt>
          <dd className='ds-typography__element'>
            <p className='ds-typography__details'>
              H1 - Jost Bold | 24px; 35px Line; -0.30 Spacing
            </p>
            <h1>Sed egestas ante et vulputate volutpat</h1>
          </dd>
          <dd className='ds-typography__element'>
            <p className='ds-typography__details'>
              H2 - Jost Bold | 20px; 29px Line; -0.25 Spacing
            </p>
            <h2>Vestibulum volutoat acus a uktrices sagittis</h2>
          </dd>
          <dd className='ds-typography__element'>
            <p className='ds-typography__details'>
              H3 - Jost Bold | 18px; 26px Line; -0.25 Spacing
            </p>
            <h3>Pellentesque a diam sit amet mi ullasmcorper vehicula</h3>
          </dd>
          <dd className='ds-typography__element'>
            <p className='ds-typography__details'>
              H4 - Jost Bold | 14px; 20px Line; -0.20 Spacing
            </p>
            <h4>Ut scelerisque hendrerit tellus Integer sagittis</h4>
          </dd>
          <dd className='ds-typography__element'>
            <p className='ds-typography__details'>
              Body 1 - Jost Regular | 16px; 23px Line
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              facere sed eius, deserunt, nesciunt unde harum distinctio illum
              consequuntur id maiores accusamus nam magnam tempora numquam
              voluptas soluta mollitia praesentium! Nesciunt, enim repudiandae
              modi placeat iste ab, odit cupiditate voluptate officiis laborum
              architecto voluptatem quasi cum assumenda error expedita. Eveniet
              doloribus numquam necessitatibus exercitationem maxime culpa
              architecto repellendus amet aspernatur.
            </p>
          </dd>
          <dd className='ds-typography__element'>
            <p className='ds-typography__details'>
              Body 2 - Jost Semibold | 13px; 19px Line
            </p>
            <p className='paragraph--semibold'>
              Facere sed eius, deserunt, nesciunt unde harum distinctio illum
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              consequuntur id maiores accusamus nam magnam tempora numquam
              voluptas soluta mollitia praesentium! Nesciunt, enim repudiandae
              modi placeat iste ab, odit cupiditate voluptate officiis laborum
              architecto voluptatem quasi cum assumenda error expedita. Eveniet
              doloribus numquam necessitatibus exercitationem maxime culpa
              architecto repellendus amet aspernatur.
            </p>
          </dd>
        </dl>
      </section>

      <section className='ds-buttons ds__section'>
        <dl className='ds-buttons__container'>
          <dt className='ds-buttons__title ds__section--title'>
            <h2>Buttons</h2>
          </dt>

          <dd className='ds-buttons__element'>
            <Button buttonStyle='button--primary'>Button Primary</Button>
          </dd>
          <dd className='ds-buttons__element'>
            <Button buttonStyle='button--secondary'>Button Secondary</Button>
          </dd>
          <dd className='ds-buttons__element'>
            <Button buttonStyle='button--tertiary'>Button Tertiary</Button>
          </dd>
          <dd className='ds-buttons__element'>
            <Button buttonStyle='button--danger'>Button Danger</Button>
          </dd>
          <dd className='ds-buttons__element'>
            <Button buttonStyle='button--back-light' svgIcon={true}>
              Go Back
            </Button>
          </dd>
          <dd className='ds-buttons__element'>
            <Button buttonStyle='button--back-dark' svgIcon={true}>
              Go Back
            </Button>
          </dd>
        </dl>
      </section>

      <section className='ds-interactive ds__section'>
        <dl className='ds-interactive__container'>
          <dt className='ds-interactive__title ds__section--title'>
            <h2>Interactive Elements</h2>
          </dt>

          <dd className='ds-interactive__element'>
            <Upvotes />
          </dd>
          <dd className='ds-interactive__element'></dd>
        </dl>
      </section>
    </div>
  );
}
