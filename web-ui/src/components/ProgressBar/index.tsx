/**
 *  @author: Razvan Rauta
 *  Date: Dec 12 2021
 *  Time: 00:37
 */

import Router from 'next/router';
import NProgress, { NProgressOptions } from 'nprogress';
import React from 'react';

type ProgressBarProps = {
  color?: string;
  height?: number;
  showOnShallow?: boolean;
  startPosition?: number;
  stopDelayMs?: number;
  options?: Partial<NProgressOptions>;
};

class ProgressBar extends React.PureComponent<ProgressBarProps> {
  static defaultProps = {
    color: '#29D',
    startPosition: 0.3,
    stopDelayMs: 200,
    height: 3,
  };

  timer: NodeJS.Timeout | undefined;

  routeChangeStart = () => {
    NProgress.set(this.props?.startPosition || 0);
    NProgress.start();
  };

  routeChangeEnd = () => {
    clearTimeout(this.timer as NodeJS.Timeout);

    this.timer = setTimeout(() => {
      NProgress.done(true);
    }, this.props.stopDelayMs);
  };

  render() {
    const { color, height } = this.props;

    return (
      <style jsx global>{`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: ${color};
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height}px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
        }
        #nprogress .spinner {
          display: 'block';
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }
        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;
          border: solid 2px transparent;
          border-top-color: ${color};
          border-left-color: ${color};
          border-radius: 50%;
          -webkit-animation: nprogresss-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
        }
        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }
        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
        @-webkit-keyframes nprogress-spinner {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }
        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    );
  }

  componentDidMount() {
    const { options } = this.props;

    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeComplete', this.routeChangeEnd);
    Router.events.on('routeChangeError', this.routeChangeEnd);
  }
}

export default ProgressBar;
