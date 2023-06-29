import * as React from 'react'
import { useEffect, useRef } from 'react';
import { Platform, UIManager, findNodeHandle, requireNativeComponent } from "react-native";

const createFragment = (viewId: number | null) => {
    let command = (UIManager as any).MapsIndoorsView.Commands.create;
    if (Platform.OS === 'android') {
        command = command.toString();
    }
    UIManager.dispatchViewManagerCommand(
        viewId,
        // we are calling the 'create' command
        command,
        [viewId],
    );
}


const MapView = ({ style }: { style: any }) => {
    const ref = useRef(null);

    useEffect(() => {
        const viewId = findNodeHandle(ref.current);
        createFragment(viewId);
    }, []);

    return (<MapsIndoorsViewManager
        style={style}
        ref={ref} />);
}

const MapsIndoorsViewManager = requireNativeComponent('MapsIndoorsView');

export default MapView;