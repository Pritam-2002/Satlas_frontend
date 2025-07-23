import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

type TabType = 'login' | 'signup' | 'forgot-password';

interface TabMenuProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  testID?: string;
}

const TabMenu: React.FC<TabMenuProps> = ({
  activeTab,
  onTabChange,
  testID,
}) => {
  return (
    <View style={styles.tabContainer} testID={testID}>
      <View style={styles.tabMenu}>
        {activeTab !== 'forgot-password' && (
          <>
            <TouchableOpacity style={styles.tabButton} onPress={() => onTabChange('login')}>
              <Text style={activeTab === 'login' ? styles.tabActive : styles.tabInactive}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={() => onTabChange('signup')}>
              <Text style={activeTab === 'signup' ? styles.tabActive : styles.tabInactive}>SIGN UP</Text>
            </TouchableOpacity>
          </>
        )}
        {activeTab === 'forgot-password' && (
          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.tabActive}>FORGOT PASSWORD</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: -1,
  },
  forgotPasswordContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tabMenu: {
    flexDirection: 'row',
    backgroundColor: '#715CFD',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    shadowColor: '#4F5B79',
    width: '100%',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
    elevation: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabActive: {
    color: '#FFFFFF',
    // fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  tabInactive: {
    color: 'rgba(255, 255, 255, 0.25)',
    fontWeight: '400',
    fontSize: 16,
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default TabMenu;