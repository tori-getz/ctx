import React, { useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import cls from './viewport.module.sass';
import { useUnit } from 'effector-react';
import {
  tabTitleUpdated,
  tabUrlUpdated,
  tabIconUpdated,
  tabUrlEntered,
  useCurrentTab,
  tabLoading
} from '~/entities/tab';
import {
  canGoBackSetted,
  canGoForwardSetted,
  goBack,
  goForward,
  pageRefreshed,
  pageRefreshStopped
} from '../model';

interface IViewportProps {
  id: string;
  url: string;
  visible: boolean;
}

export const Viewport: React.FC<IViewportProps> = ({
  id,
  visible,
  url
}) => {
  const webviewRef = useRef<Electron.WebviewTag>(null);

  const currentTab = useCurrentTab();

  const updateTabTitle = useUnit(tabTitleUpdated);
  const updateTabUrl = useUnit(tabUrlUpdated);
  const updateTabIcon = useUnit(tabIconUpdated);

  const loadTab = useUnit(tabLoading);

  const [setCanGoBack, setCanGoForward] = useUnit([canGoBackSetted, canGoForwardSetted]);

  useEffect(() => {
    if (!webviewRef.current) return;
    webviewRef.current.src = url ?? '';

    const unwatch = tabUrlEntered.watch((newUrl: string) => {
      if (!webviewRef.current) return;
      webviewRef.current.src = newUrl;
    });

    return () => {
      unwatch();
    }
  }, [webviewRef]);

  useEffect(() => {
    if (!webviewRef.current) return;
    
    const webview = webviewRef.current;

    const handleTitleUpdate = ({ title }: Electron.Event & { title: string }) => {
      updateTabTitle({ id, title });
    };

    const handleIconUpdate = ({ favicons: [icon] }: Electron.Event & { favicons: Array<string> }) => {
      updateTabIcon({ id, icon });
    };

    const handleNavigation = () => {
      setCanGoBack(webview.canGoBack());
      setCanGoForward(webview.canGoForward());
      
      setTimeout(() => {
        const nextUrl = webview.getURL();
        // alert(nextUrl);
        updateTabUrl({ id, url: nextUrl });
      }, 100);
    }

    const goBackUnwatch = goBack.watch(() => {
      if (id !== currentTab?.id) return;
      webview.goBack();
    });

    const goForwardUnwatch = goForward.watch(() => {
      if (id !== currentTab?.id) return;
      webview.goForward();
    });

    const pageRefreshedUnwatch = pageRefreshed.watch(() => {
      if (id !== currentTab?.id) return;
      webview.reload();
    });

    const pageRefreshStoppedUnwetch = pageRefreshStopped.watch(() => {
      if (id !== currentTab?.id) return;
      webview.stop();
    });

    const handleStartLoading = () => {
      loadTab({ id, loading: true });
    };

    const handleStopLoading = () => {
      loadTab({ id, loading: false });
    };

    webview.addEventListener('did-start-loading', handleStartLoading);
    webview.addEventListener('did-stop-loading', handleStopLoading);
    webview.addEventListener('page-title-updated', handleTitleUpdate);
    webview.addEventListener('page-favicon-updated', handleIconUpdate);
    webview.addEventListener('did-navigate-in-page', handleNavigation);

    return () => {
      webview.removeEventListener('did-start-loading', handleStartLoading);
      webview.removeEventListener('did-stop-loading', handleStopLoading);
      webview.removeEventListener('page-title-updated', handleTitleUpdate);
      webview.removeEventListener('page-favicon-updated', handleIconUpdate);
      webview.removeEventListener('did-navigate-in-page', handleNavigation);

      goBackUnwatch();
      goForwardUnwatch();
      pageRefreshedUnwatch();
      pageRefreshStoppedUnwetch();
    }
  }, [currentTab]);

  return (
    <webview
      className={clsx(
        cls.viewport,
        { [cls.viewport_hidden]: !visible }
      )}
      ref={webviewRef}
    />
  );
};
