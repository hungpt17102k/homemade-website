import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Products',
    Svg: require('@site/static/img/box.svg').default,
    description: (
      <>
        Our productions.<br/>
        You can check it in the <code>project</code> section.
      </>
    ),
  },
  {
    title: 'Documents',
    Svg: require('@site/static/img/documents.svg').default,
    description: (
      <>
        Document of our packages.<br/>
        Go ahead and look into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Blogs',
    Svg: require('@site/static/img/content-writing.svg').default,
    description: (
      <>
        Blogs and tips in Unity.<br/>
        Game product development journey.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
