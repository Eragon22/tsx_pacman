import './Main.less';

import CenterPane from './main/CenterPane';
import LeftPane from './main/LeftPane';
import RightPane from './main/RightPane';

/**
 * Main component that renders a responsive layout with three panes: LeftPane, CenterPane, and RightPane.
 * 
 * The layout adjusts based on the screen size using Bootstrap classes:
 * - On extra-large screens (≥1200px), the LeftPane is displayed first, CenterPane in the middle, and RightPane last.
 * - On large screens (≥992px), the LeftPane takes up 4 columns, CenterPane takes up 8 columns, and RightPane takes up 12 columns.
 * - On medium screens (≥768px), the LeftPane and RightPane each take up 6 columns, and CenterPane takes up 12 columns.
 * - On small screens (<768px), all panes take up the full width (12 columns).
 * 
 * @returns {JSX.Element} The rendered Main component.
 */
export default function Main() {
    return <div class="Main row w-100 m-0 p-0">
        <LeftPane className="col-12 col-md-6 col-lg-4 col-xl-3 m-0 order-xl-first" />
        <CenterPane className="col-12 col-md-12 col-lg-8 col-xl-6 m-0 order-first" />
        <RightPane className="col-12 col-md-6 col-lg-12 col-xl-3 m-0 order-last" />
    </div>
}