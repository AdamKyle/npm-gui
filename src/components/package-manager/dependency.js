import { Component } from 'react';
import { connect } from 'react-refetch';
import DependencyCard from './dependency-card';

class Dependency extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { packageData, packageMeta } = this.props;

    if (packageData.pending) {
      return null;
    } else if (packageData.fulfilled) {
      let isUpToDate = '';
      let versionToUpdateTo = <p><span>Package is uptodate.</span></p>;

      if (packageData.value['dist-tags'].latest !== packageMeta.data.version) {
        versionToUpdateTo = <p><span>New Version: {packageData.value['dist-tags'].latest}</span></p>;
        isUpToDate = <a href="#">Update</a>;
        this.props.dependencyCount();
      }

      return(
        <DependencyCard
          packageMeta={packageMeta}
          isUpToDate={isUpToDate}
          versionToUpdateTo={versionToUpdateTo}
        />
      );
    }
  }
}

export default connect((props) => {
  return { packageData: 'https://registry.npmjs.org/' + props.packageMeta.name };
})(Dependency);
