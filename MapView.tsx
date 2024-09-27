import * as React from 'react'
import { useEffect, useRef } from 'react';
import { Platform, UIManager, findNodeHandle, requireNativeComponent } from "react-native";
import MPCameraPosition from './MPCameraPosition';

const createFragment = (viewId: number | null, camera?: MPCameraPosition, showCompass?: boolean) => {
    let command = (UIManager as any).MapsIndoorsView.Commands.create;
    if (Platform.OS === 'android') {
        command = command.toString();
    }
    UIManager.dispatchViewManagerCommand(
        viewId,
        // we are calling the 'create' command
        command,
        [viewId, JSON.stringify(camera), showCompass],
    );
}

const MapView = ({ style, camera, showCompass }: { style: any, camera?: MPCameraPosition, showCompass?: boolean}) => {
    const ref = useRef(null);

    useEffect(() => {
        const viewId = findNodeHandle(ref.current);
        createFragment(viewId, camera, showCompass !== undefined ? showCompass : true);
    }, []);

    return (<MapsIndoorsViewManager
        style={style}
        ref={ref}
        camera={camera}
        showCompass={showCompass} />);
}

const MapsIndoorsViewManager = requireNativeComponent('MapsIndoorsView');

export default MapView;