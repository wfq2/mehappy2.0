import { FC } from "react";
import App from "../components/App";
import LayoutStyle from "../components/LayoutStyle";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {Form, Input, Button, Checkbox, Layout, Select } from 'antd';

const { Content } = Layout; 
const { TextArea } = Input;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const get_Restaurant = gql`
  query getRestaurant {
    restaurant(slug : "clerys") {
      name
      owner
      description
      address
      zip
      city
      state
      tags
      isPublished
    }
  }
`;

const EditRestaurantPage = () => {
  const { loading, error, data } = useQuery(get_Restaurant);
  if ( loading ) {
    return 'Loading ...';
  }
  if ( error ) {
    return 'Problem with fetching data';
  }

  return (
    <App>
      <LayoutStyle title="Home | Next.js + TypeScript Example">
        <Content>
            <Form
              {...layout}
              name="editRestaurant"
            >
                <Form.Item
                  label = "Name"
                  name = "rName"
                  initialValue = { data.restaurant.name }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label = "Owner"
                  name = "rOwner"
                  initialValue = { data.restaurant.owner }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label = "Description"
                  name = "rDescription"
                  initialValue = { data.restaurant.description }
                >
                  <TextArea rows={6}/>
                </Form.Item>

                <Form.Item
                  label = "Address line 1"
                  name = "rAddress1"
                  initialValue = { data.restaurant.address }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label = "Address line 2"
                  name = "rAddress2"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label = "City"
                  name = "rCity"
                  initialValue = { data.restaurant.city }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label = "State"
                  name = "rState"
                  initialValue = { data.restaurant.state }
                >
                  <Select>
                      <Select.Option value="Demo-States">Sample State</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label = "Zip"
                  name = "rZip"
                  initialValue = { data.restaurant.zip }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label = "Phone Number"
                  name = "rPhoneNumber"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label = "Tags"
                  name = "rTags"
                  initialValue = { data.restaurant.tags }
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label = "Published"
                  name = "rPublished"
                  initialValue = { data.restaurant.isPublished }
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </Content>
      
    </LayoutStyle>
  </App>
  );

  };

export default EditRestaurantPage;
