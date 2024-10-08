import { useEffect, useState } from 'react';
import { adminAPIs } from '../../../apis/admin.api';
import { UserProps } from '../../../types/user.type';
import { List } from "antd";

function DashboardPage() {
  const [accountList, setAccountList] = useState<UserProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await adminAPIs.accessDashboard();

      setAccountList(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <List>
      {accountList.map((account, i) => (
          <List.Item key={i}>
            <List.Item.Meta description="User" title={account?.email} />
          </List.Item>
        ))}
      </List>
    </>
  );
}

export default DashboardPage;
