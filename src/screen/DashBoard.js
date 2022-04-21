import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios'; // For API calling
import ArticlesCard from './components/ArticleCard';
const baseUrl = 'https://newsapi.org/v2/everything?'; // API Base Url
const apiKey = '9ffb9c8448f04ef0867ba2a3deb208dd'; // API key for API calling

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    //States For Dashboard Articles Listing
    this.state = {
      ArticlesList: [], // Array for Blockchain Article Listing
      PopularArticlesList: [], // Array for Popular Articles Listing
      ProgressDialog: true, // For Handeling Progress Dialog
      activeTab: 0, // Tabs For Categories of Articles
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  //When user come to the Dashboard screen, this function will call first
  componentDidMount() {
    this.GetBlockchainArticles(); // Get Blockchain Articles Function
    this.GetPopularArticles(); //  Get Popular Articles Function
  }

  // API call of Get Blockchain Articles
  GetBlockchainArticles = () => {
    axios({
      method: 'get',
      url: `${baseUrl}q=bitcoin&apiKey=${apiKey}`, // API Url For Blockchain Articles
    }).then(response => {
      if (response.data.status === 'ok') {
        this.setState({
          ArticlesList: response.data.articles, // Set Blockchain Articles Data in Array
          ProgressDialog: false, // Progress dialog dissapier
        });
      }
    });
  };

  // API call of Get Popular Articles
  GetPopularArticles = () => {
    //Here i want to give filteration for dating & sorting for categories but for that i need some times
    axios({
      method: 'get',
      url: `${baseUrl}q=apple&from=2022-04-19&to=2022-04-19&sortBy=popularity&apiKey=${apiKey}`,
    }).then(response => {
      if (response.data.status === 'ok') {
        this.setState({
          PopularArticlesList: response.data.articles, // Set Popular Articles Data in Array
          ProgressDialog: false, // Progress dialog dissapier
        });
      }
    });
  };

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  // Back handler function for device
  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  // Change Tab Function for Changing Categories
  onChangeTab = () => {
    this.setState({
      activeTab: this.state.activeTab == 0 ? 1 : 0,
    });
  };

  // Dashboard Design
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#F4F4F4'}}>
        <View style={styles.container}>
          <View style={styles.containerTopbar}>
            <View style={{flexDirection: 'row'}}>
              {/* Not given outline styling because having only 3 props */}
              <View
                style={{
                  borderRadius: 5,
                  marginStart: 10,
                  justifyContent: 'center',
                }}>
                {/* Not given outline styling because having only 2 props */}
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  Pixomatic News Updates
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Not given outline styling because having only 3 props */}

        <View style={styles.TabContainer}>
          <TouchableOpacity
            onPress={() => this.onChangeTab()}
            style={{
              ...styles.ChangeTabButton,
              backgroundColor: this.state.activeTab === 0 ? '#FF7F50' : 'gray',
            }}>
            <Text style={styles.TabContaintText}>Blockchain</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onChangeTab()}
            style={{
              ...styles.ChangeTabButton,
              backgroundColor: this.state.activeTab === 1 ? '#FF7F50' : 'gray',
            }}>
            <Text style={styles.TabContaintText}>Popular</Text>
          </TouchableOpacity>
        </View>
        {this.state.ProgressDialog === true ? (
          <ActivityIndicator
            animating={this.state.ProgressDialog}
            color="blue"
            size="large"
            style={styles.activityIndecator}
          />
        ) : (
          <FlatList
            data={
              this.state.activeTab === 0
                ? this.state.ArticlesList //Set Data When selected Blockchain Tab
                : this.state.PopularArticlesList //Set Data When selected Popular Tab
            }
            renderItem={item => (
              <ArticlesCard item={item}> </ArticlesCard> // Rendering Article Card
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Styles Of Activity Indecator
  activityIndecator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    alignSelf: 'center',
  },
  // Styles Of Main Container
  container: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    elevation: 2,
  },
  // Styles Of Top Bar Container
  containerTopbar: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    elevation: 2,
    flexDirection: 'row',
  },
  // Tab Container for Top Tab View
  TabContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  // Tab container's Containt Text
  TabContaintText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  ChangeTabButton: {
    height: 40,
    width: '49%',

    borderRadius: 7,
    justifyContent: 'center',
  },
});
