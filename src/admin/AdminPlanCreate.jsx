import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

const AdminPlanCreate = () => {
  const [data, setData] = useState({ title: "", price: 0, features: [] });
  const onSave = (formData) => {
    console.log("-------- formData -----", formData);
  };

  const handleInputChange = (change) => {
    console.log("----- change ----- ", change);
  };

  return (
    <form
      onSubmit={onSave}
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "5%",
      }}>
      <div className='grid grid-cols-2 mt-5 gap-3'>
        <div>
          <label className='text-sm'>Title</label>
          <Input
            name='title'
            defaultValue={data?.title}
            required
            onChange={(event) =>
              handleInputChange({ change: event.target.value, key: "title" })
            }
          />
        </div>
        <div>
          <label className='text-sm'>price</label>
          <Input
            name='price'
            required
            onChange={(event) =>
              handleInputChange({ change: event.target.value, key: "title" })
            }
            defaultValue={data?.price}
          />
        </div>
        <div>
          <label className='text-sm'>Features</label>
          <Input
            name='features'
            required
            defaultValue={data?.features}
            onChange={() => {}}
          />
        </div>
      </div>
      <div className='mt-3 flex justify-end'>
        <Button type='submit'>"save"</Button>
      </div>
    </form>
  );
};

export default AdminPlanCreate;
// {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
