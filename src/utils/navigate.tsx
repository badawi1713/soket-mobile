import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

function navigate(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(CommonActions.navigate(routeName, params));
    } else {
        console.warn(`Navigation to ${routeName} failed because the navigation container is not ready.`);
    }
}

function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.dispatch(CommonActions.goBack());
    } else {
        console.warn('Cannot go back because there is no navigation history.');
    }
}

function reset(routeName: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: routeName, params }],
            })
        );
    } else {
        console.warn(`Navigation reset to ${routeName} failed because the navigation container is not ready.`);
    }
}

export { goBack, navigate, navigationRef, reset };

