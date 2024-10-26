import classnames from 'classnames';
import Icon from 'src/components/Icon';
import './index.scss';

interface Props {
  text?: string,
  hasNoText?: boolean,
}

const Loading = (props: Props): JSX.Element => {
  const {
    text = 'chargement...',
    hasNoText = false,
  } = props;


  const className = classnames('Loading', {
    'Loading--no-text': hasNoText,
  });

  return (
    <div className={className}>
      <div className="Loading__content">
        <Icon name="loading" className="Loading__icon" spin />
        {!hasNoText && (
          <span className="Loading__text">
            {text}...
          </span>
        )}
      </div>
    </div>
  );
};

export default Loading;
