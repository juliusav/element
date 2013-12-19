
/**
 * [exports description]
 * @type {Object}
 */

var util = require('./util')
  , merge = util.merge
  , OS = Ti.Platform.osname;

var Proxys = module.exports = {};

var Android = {};
var iPad = {};
var iPhone = {};
var iOS = {};

var Base = {
  'Calendar' : Ti.Calendar,
  'Stream' : Ti.Stream,
  'Codec' : Ti.Codec,
  'Utils' : Ti.Utils,
  'Contacts.Group' : Ti.Contacts.createGroup,
  'Contacts.Person' : Ti.Contacts.createPerson,
  'Database.Open' : Ti.Database.open,
  'Database.Execute' : Ti.Database.execute,
  'Facebook' : Ti.Facebook,
  'Geolocation' : Ti.Geolocation,
  'Gesture' : Ti.Gesture,
  'Acceleromete' : Ti.Accelerometer,
  '2DMatrix' : Ti.UI.create2DMatrix,
  '3DMatrix' : Ti.UI.create3DMatrix,
  'ActivityIndicator' : Ti.UI.createActivityIndicator,
  'AlertDialog' : Ti.UI.createAlertDialog,
  'Animation' : Ti.UI.createAnimation,
  'Button' : Ti.UI.createButton,
  'ButtonBar' : Ti.UI.createButtonBar,
  'CoverFlowView' : Ti.UI.createCoverFlowView,
  'DashboardItem' : Ti.UI.createDashboardItem,
  'DashboardView' : Ti.UI.createDashboardView,
  'EmailDialog' : Ti.UI.createEmailDialog,
  'ImageView' : Ti.UI.createImageView,
  'Label' : Ti.UI.createLabel,
  'ListSection' : Ti.UI.createListSection,
  'ListView' : Ti.UI.createListView,
  'MaskedImage' : Ti.UI.createMaskedImage,
  'Notification' : Ti.UI.createNotification,
  'OptionDialog' : Ti.UI.createOptionDialog,
  'Picker' : Ti.UI.createPicker,
  'PickerColumn' : Ti.UI.createPickerColumn,
  'PickerRow' : Ti.UI.createPickerRow,
  'ProgressBar' : Ti.UI.createProgressBar,
  'ScrollView' : Ti.UI.createScrollView,
  'ScrollableView' : Ti.UI.createScrollableView,
  'Slider' : Ti.UI.createSlider,
  'Switch' : Ti.UI.createSwitch,
  'Tab' : Ti.UI.createTab,
  'TabGroup' : Ti.UI.createTabGroup,
  'TabbedBar' : Ti.UI.createTabbedBar,
  'TableView' : Ti.UI.createTableView,
  'TableViewRow' : Ti.UI.createTableViewRow,
  'TableViewSection' : Ti.UI.createTableViewSection,
  'TextArea' : Ti.UI.createTextArea,
  'TextField' : Ti.UI.createTextField,
  'Toolbar' : Ti.UI.createToolbar,
  'View' : Ti.UI.createView,
  'WebView' : Ti.UI.createWebView,
  'Window' : Ti.UI.createWindow,
  'Media.AudioPlayer' : Ti.Media.createAudioPlayer,
  'Media.AudioRecorder' : Ti.Media.createAudioRecorder,
  'Media.Item' : Ti.Media.createItem,
  'Media.MusicPlayer' : Ti.Media.createMusicPlayer,
  'Media.Sound' : Ti.Media.createSound,
  'Media.VideoPlayer' : Ti.Media.createVideoPlayer,
  'Media.showCamera' : Ti.Media.showCamera,
  'Network.Socket.TCP' : Ti.Network.Socket.createTCP,
};

if (OS === 'iphone'){
  iPhone = {
    'iPhone.ActivityIndicatorStyle' : Ti.UI.iPhone.ActivityIndicatorStyle,
    'iPhone.AlertDialogStyle' : Ti.UI.iPhone.AlertDialogStyle,
    'iPhone.AnimationStyle' : Ti.UI.iPhone.AnimationStyle,
    'iPhone.ListViewCellSelectionStyle' : Ti.UI.iPhone.ListViewCellSelectionStyle,
    'iPhone.ListViewScrollPosition' : Ti.UI.iPhone.ListViewScrollPosition,
    'iPhone.ListViewStyle' : Ti.UI.iPhone.ListViewStyle,
    'iPhone.NavigationGroup' : Ti.UI.iPhone.NavigationGroup,
    'iPhone.ProgressBarStyle' : Ti.UI.iPhone.ProgressBarStyle,
    'iPhone.RowAnimationStyle' : Ti.UI.iPhone.RowAnimationStyle,
    'iPhone.ScrollIndicatorStyle' : Ti.UI.iPhone.ScrollIndicatorStyle,
    'iPhone.StatusBar' : Ti.UI.iPhone.StatusBar,
    'iPhone.SystemButton' : Ti.UI.iPhone.SystemButton,
    'iPhone.SystemButtonStyle' : Ti.UI.iPhone.SystemButtonStyle,
    'iPhone.SystemIcon' : Ti.UI.iPhone.SystemIcon,
    'iPhone.TableViewCellSelectionStyle' : Ti.UI.iPhone.TableViewCellSelectionStyle,
    'iPhone.TableViewScrollPosition' : Ti.UI.iPhone.TableViewScrollPosition,
    'iPhone.TableViewSeparatorStyle' : Ti.UI.iPhone.TableViewSeparatorStyle,
    'iPhone.TableViewStyle' : Ti.UI.iPhone.TableViewStyle,
  };
}

if (OS === 'ipad') {
  iPad = {
    'iPad.DocumentViewer' : Ti.UI.iPad.DocumentViewer,
    'iPad.SplitWindow' : Ti.UI.iPad.SplitWindow,
    'iPad.Popover' : Ti.UI.iPad.Popover,
  };
}


if (OS === 'ipad' || OS === 'iphone'){
  iOS = {
    'iOS.AdView' : Ti.UI.iOS.AdView,
    'iOS.CoverFlowView' : Ti.UI.iOS.CoverFlowView,
    'iOS.DocumentViewer' : Ti.UI.iOS.DocumentViewer,
    'iOS.TabbedBar' : Ti.UI.iOS.TabbedBar,
    'iOS.Toolbar' : Ti.UI.iOS.Toolbar
  };
}

merge(Proxys, Base, Android, iPad, iPhone, iOS);
