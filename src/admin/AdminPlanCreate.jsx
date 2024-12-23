import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import GlobalApi from "./../../service/GlobalApi";

const AdminPlanCreate = () => {
  const [data, setData] = useState({ title: "", price: 0, features: [] });
  const navigation = useNavigate()
  const [loading, setLoading] = useState(false);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form Data:", data);
    GlobalApi.createNewPlan({data: {
      title: data.title,
      price: data.price,
      features: {list: data.features}
    }}).then((resp) => navigation('/admin/plans'))
    setTimeout(() => setLoading(false), 1000); // Simulate saving
  };

  const handleInputChange = ({ change, key }) => {
    setData((prev) => ({ ...prev, [key]: change }));
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
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
      }}>
      <div><Button onClick={() => (navigation('/admin/plans'))}><ArrowBackIcon /></Button></div>
      <div className='grid grid-cols-2 mt-5 gap-4'>
        <div>
          <label className='text-sm font-semibold mb-1 block'>Title</label>
          <Input
            name='title'
            defaultValue={data?.title}
            required
            onChange={(event) =>
              handleInputChange({ change: event.target.value, key: "title" })
            }
            className='w-full'
          />
        </div>
        <div>
          <label className='text-sm font-semibold mb-1 block'>Price</label>
          <Input
            name='price'
            type='number'
            required
            defaultValue={data?.price}
            onChange={(event) =>
              handleInputChange({ change: event.target.value, key: "price" })
            }
            className='w-full'
          />
        </div>
        <div className='col-span-2'>
          <FeaturesManager
            defaultFeatures={data.features}
            onFeaturesChange={(newFeatures) =>
              setData((prev) => ({ ...prev, features: newFeatures }))
            }
          />
        </div>
      </div>
      <div className='mt-5 flex justify-end'>
        <Button type="submit" disabled={loading}>
          {loading ? <LoaderCircle className='animate-spin h-5 w-5' /> : "Save"}
        </Button>
      </div>
    </form>
  );
};

const FeaturesManager = ({ defaultFeatures = [], onFeaturesChange }) => {
  const [features, setFeatures] = useState(defaultFeatures);
  const [currentFeature, setCurrentFeature] = useState("");

  const addFeature = () => {
    if (currentFeature.trim() && !features.includes(currentFeature)) {
      const newFeatures = [...features, currentFeature];
      setFeatures(newFeatures);
      onFeaturesChange(newFeatures);
      setCurrentFeature("");
    }
  };

  const deleteFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
    onFeaturesChange(newFeatures);
  };

  return (
    <div>
      <label className='text-sm font-semibold mb-1 block'>Features</label>
      <div className='flex items-center gap-2 mb-3'>
        <Input
          name='featureInput'
          value={currentFeature}
          placeholder='Add a new feature'
          onChange={(e) => setCurrentFeature(e.target.value)}
          className='flex-grow'
        />
        <Button type='button' onClick={addFeature} className='whitespace-nowrap'>
          <AddCircleOutlineIcon />
        </Button>
      </div>
      <ul className='space-y-2'>
        {features.map((feature, index) => (
          <li key={index} className='flex items-center gap-2'>
            <Input
              name={`features[${index}]`}
              value={feature}
              readOnly
              className='flex-grow'
            />
            <Button
              type='button'
              className='whitespace-nowrap'
              onClick={() => deleteFeature(index)}
              >
              <HighlightOffIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPlanCreate;
