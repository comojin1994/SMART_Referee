using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BallManager : MonoBehaviour
{
    public GameObject ballPrefab;
    List<Dictionary<string, object>> data;

    void Awake()
    {
        data = CSVReader.Read("ball_pose_1009");
        print(data.Count);
        for (var i = 0; i < data.Count; i++)
        {
            print("pos_x " + data[i]["pos_x"] + " " +
                   "pos_y " + data[i]["pos_y"] + " " +
                   "pos_z " + data[i]["pos_z"] + " ");
        }

    }

    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Start");
        Instantiate(ballPrefab, Vector3.zero, Quaternion.identity);
        // Instantiate(ballPrefab, new Vector3(0, 0, 0), Quaternion.identity);
        float dist = 18.4f;
        float z_step = dist / data.Count;
        float x_offset = float.Parse(data[0]["pos_x"].ToString());


        for (var i = 0; i < data.Count; i++)
        {
            
            print("pos_x " + data[i]["pos_x"] + " " +
                   "pos_y " + data[i]["pos_y"] + " " +
                   "pos_z " + data[i]["pos_z"] + " ");

            float sf = 0.01f;
            

            float pos_x = (float.Parse(data[i]["pos_x"].ToString()) - x_offset) * sf;
            float pos_y = (416 - float.Parse(data[i]["pos_y"].ToString())) * sf;
            // float pos_z = float.Parse(data[i]["pos_z"].ToString());
            float pos_z = z_step * i;

            Instantiate(ballPrefab, new Vector3(pos_x, pos_y, pos_z), Quaternion.identity);
        }

    }

    // Update is called once per frame
    void Update()
    {
        //Debug.Log("Update");
    }
}
